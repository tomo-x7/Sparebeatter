# Sparebeat_extensions

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fjlmjjmfiiafghpnpegalcdfnclepakp?style=for-the-badge&logo=googlechrome&logoColor=white&label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/sparebeat-extensions/fjlmjjmfiiafghpnpegalcdfnclepakp?hl=ja)
[![Firefox Add-ons](https://img.shields.io/amo/v/sparebeat-extensions?style=for-the-badge&logo=firefox&logoColor=white&label=Firefox%20Add-ons)](https://addons.mozilla.org/ja/firefox/addon/sparebeat-extensions/)

# For Reviewers
## How to Build
1. Move to the directory:
    ```shell
    cd extension
    ```
1. Install dependencies:
    ```shell
    pnpm i --frozen-lockfile
    ```
1. Build for release:
    ```shell
    pnpm run release
    ```
1. Select `rebuild`
1. The zip file will be generated in `extension/release-x.x.x@mmdd/`