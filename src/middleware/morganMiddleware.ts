import morgan, {StreamOptions} from "morgan";
import Logger from "../../src/config/logger";

const dev = process.env.DEV;

const stream: StreamOptions ={
    write: (message) => Logger.http(message),
};

const skip = () =>{
    const env = dev || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-lenght] - :response-time ms ",
    {stream, skip}
);


export default morganMiddleware;