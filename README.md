<img src="https://motionpicture.jp/images/common/logo_01.svg" alt="motionpicture" title="motionpicture" align="right" height="56" width="98"/>

# SSKTS Admin Console Web Application

## Table of contents

* [Usage](#usage)

## Usage

### Environment variables

| Name                               | Required | Value           | Purpose                |
|------------------------------------|----------|-----------------|------------------------|
| `DEBUG`                            | false    | sskts-console:* | Debug                  |
| `NPM_TOKEN`                        | true     |                 | NPM auth token         |
| `BASIC_AUTH_NAME`                  | false    |                 | Basic Authentication   |
| `BASIC_AUTH_PASS`                  | false    |                 | Basic Authentication   |
| `MONGOLAB_URI`                     | true     |                 | MongoDB connection URI |
| `REDIS_HOST`                       | true     |                 | COA API refresh token  |
| `REDIS_PORT`                       | true     |                 | COA API refresh token  |
| `REDIS_KEY`                        | true     |                 | COA API refresh token  |
| `COA_ENDPOINT`                     | true     |                 | COA API endpoint       |
| `COA_REFRESH_TOKEN`                | true     |                 | COA API refresh token  |
| `API_ENDPOINT`                     | true     |                 | SSKTSAPIエンドポイント        |
| `API_AUTHORIZE_SERVER_DOMAIN`      | true     |                 | SSKTSAPI認可サーバードメイン     |
| `API_CLIENT_ID`                    | true     |                 | SSKTSAPIクライアントID       |
| `API_CLIENT_SECRET`                | true     |                 | SSKTSAPIクライアントシークレット   |
| `API_CODE_VERIFIER`                | true     |                 | SSKTSAPIコード検証鍵         |
| `USER_EXPIRES_IN_SECONDS`          | true     |                 | ログインユーザーセッション保持期間      |
| `COGNITO_USER_POOL_ID`             | true     |                 |                        |
