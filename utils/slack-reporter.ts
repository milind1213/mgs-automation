import { WebClient } from '@slack/web-api';
import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';

let slackClient: WebClient | undefined;

export async function initialize(slackToken: string, channelId: string): Promise<WebClient> {
    if (!slackToken || !channelId) {
        throw new Error('Slack token or channel ID is missing.');
    }

    try {
        const client = new WebClient(slackToken);
        const response = await client.conversations.info({ channel: channelId });
        if (!response.ok) {
            throw new Error(`Failed to verify Slack channel: ${response.error}`);
        }
        slackClient = client;
        console.log(`Slack client initialized for channel: ${response.channel?.name || channelId}`);
        return client;
    } catch (error) {
        console.error('Error initializing Slack client:', error);
        throw error;
    }
}

export async function sendExecutionReportToSlack(reportPath: string, reportHeader: string, slackChannelId: string): Promise<any | undefined> {
    if (!slackClient) {
        throw new Error('Slack client has not been initialized. Call initialize() first.');
    }

    const filePath = path.resolve(reportPath);
    async function checkFileExists(): Promise<boolean> 
    {
        const maxRetries = 3;
        const retryDelayMs = 5000;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            if (fs.existsSync(filePath)) {
                return true;
            }
            console.log(`File not found at ${filePath}. Retrying in 5 seconds... (Attempt ${attempt}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelayMs));
        }

        console.error(`File not found after ${maxRetries} retries: ${filePath}`);
        return false;
    }

    const fileExists = await checkFileExists();
    if (!fileExists) return;
    try {
        console.log(`Uploading report ${path.basename(filePath)} to Slack...`);
        const fileStream: Stream = fs.createReadStream(filePath);
        fileStream.on('error', (err) => {
            console.error('File stream error during upload:', err);
            throw new Error(`File stream error: ${err.message}`);
        });

        const response = await slackClient.files.uploadV2({
            channel_id: slackChannelId,
            initial_comment: reportHeader,
            file: fileStream,
            filename: path.basename(filePath),
        }) as any;

        if (response.ok && response.file?.id) {
            console.log('Report uploaded successfully to Slack!');
            console.log('File ID:', response.file.id);
            console.log('File URL:', response.file.permalink || 'No link available');
        } else {
            console.error('Upload failed. Slack API response error:', response.error);
            console.error('Full Slack response:', JSON.stringify(response, null, 2));
        }

        return response;

    } catch (error) {
        console.error('FATAL Error uploading file to Slack:', error);
    }
}