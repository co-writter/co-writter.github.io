import { Octokit } from "octokit";
import { GITHUB_TOKEN } from "../constants";

const REPO_OWNER = "co-writter"; // Or the authenticated user
const REPO_NAME = "co-writter.github.io"; // Storing in the main repo or a data repo

// Initialize Octokit
const octokit = new Octokit({
    auth: GITHUB_TOKEN
});

// --- GitHub as Database ---

export const getUserGithubToken = (): string | null => {
    return GITHUB_TOKEN;
};

export const saveUserDataToGitHub = async (username: string, data: any): Promise<{ success: boolean, message?: string, url?: string }> => {
    try {
        // 1. Get the authenticated user to determine the repo owner if needed
        // For now, we assume we are writing to the configured repo

        const path = `users/${username}.json`;
        const content = btoa(JSON.stringify(data, null, 2)); // Base64 encode
        const message = `Update user data for ${username}`;

        // Check if file exists to get SHA
        let sha;
        try {
            const { data: existingFile } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: REPO_OWNER,
                repo: REPO_NAME,
                path: path,
            });
            if (!Array.isArray(existingFile)) {
                sha = existingFile.sha;
            }
        } catch (e) {
            // File doesn't exist, that's fine
        }

        // Create or Update file
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: path,
            message: message,
            content: content,
            sha: sha
        });

        // Also save to localStorage for immediate preview
        localStorage.setItem(`cowritter_site_${username}`, JSON.stringify(data));

        return {
            success: true,
            message: "Deployed to GitHub Pages",
            url: `https://${REPO_OWNER}.github.io/${REPO_NAME}/users/${username}.json`
        };
    } catch (e) {
        console.error("Deployment failed", e);
        return { success: false, message: "GitHub Storage Error: " + (e as any).message };
    }
};

export const loadUserProfileFromGitHub = async (username: string) => {
    // 1. Try to load from our Simulated "Cloud" (LocalStorage) for speed
    try {
        const localData = localStorage.getItem(`cowritter_site_${username}`);
        if (localData) {
            return JSON.parse(localData);
        }
    } catch (e) {
        console.warn("Failed to load from local storage simulation");
    }

    // 2. Real GitHub Fetch
    try {
        // Use raw.githubusercontent.com for direct JSON access
        const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/users/${username}.json`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to load profile from GitHub:", error);
        return null;
    }
};

// --- Google Integrations ---

export const getGoogleAccessToken = (): string | null => {
    // In production, manage this via Google Identity Services token client
    return localStorage.getItem('google_access_token');
};

export const exportToGoogleDocs = async (content: string, title: string): Promise<string> => {
    // ... (Keep existing implementation or update if needed)
    // For now, keeping the simulation/fetch logic as is unless requested
    const accessToken = getGoogleAccessToken();

    if (!accessToken) {
        console.log("Simulating Google Docs Export...");
        await new Promise(r => setTimeout(r, 1500));
        return "https://docs.google.com/document/d/simulated_doc_id/edit";
    }

    try {
        const response = await fetch('https://docs.googleapis.com/v1/documents', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        });

        const doc = await response.json();
        const docId = doc.documentId;

        // Insert Content
        await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requests: [{
                    insertText: {
                        text: content,
                        location: { index: 1 }
                    }
                }]
            })
        });

        return `https://docs.google.com/document/d/${docId}/edit`;
    } catch (error) {
        console.error("Google Docs Export Failed:", error);
        throw error;
    }
};

export const backupToDrive = async (filename: string, data: any) => {
    const accessToken = getGoogleAccessToken();
    if (!accessToken) {
        console.log("Simulating Drive Backup...");
        return;
    }

    const metadata = {
        name: filename,
        mimeType: 'application/json',
        parents: ['appDataFolder'] // App specific folder
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: form
    });
};
