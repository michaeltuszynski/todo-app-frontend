import * as dotenv from "dotenv";

let path;
switch (process.env.NODE_ENV) {
    case "production":
        path = `${__dirname}/../.env.production`
        console.log(path);
        break;
    default:
        path = `${__dirname}/../.env.development`
}
dotenv.config({ path: path })

let configExports = {
    REACT_APP_BACKEND_URL : `${process.env.REACT_APP_BACKEND_URL}:5000`
}

export default configExports;