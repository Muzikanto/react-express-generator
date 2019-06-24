import {IConfig} from "../typings";

export default function getMainConfig(config: IConfig) {
    return {
        "postgresSqlUrl": "postgres://user:password@host:port/database",
        ...(config.pgSession ? {
            "session": {
                "secret": "12345",
                "key": "54321",
                "cookie": {
                    "path": "/",
                    "httpOnly": true,
                    "maxAge": 603600000
                }
            },
            "crypto":{
                "secret": "gfds5b4sffv3tbtbshdvg3g5vgh4bn",
                "iv": "fhrqkr6h90g3mo4f"
            }
        }: {}),
    }
}
