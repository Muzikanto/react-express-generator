export default function getManifest(name: string) {
    return {
        "short_name": "React App",
        name,
        "icons": [
            {
                "src": "favicon.ico",
                "sizes": "64x64 32x32 24x24 16x16",
                "type": "image/x-icon"
            }
        ],
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
    }
}
