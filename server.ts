import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (request, response) => {
  const date: Date | undefined = createFromDateParam(request.params.date);
  return response.json(date ? { unix: date.getTime(), utc: date.toUTCString() } : { error: 'Invalid Date' });
});

app.listen(port, () => {
  console.log('⚡️[server]: Your app is listening on port ' + port);
});

function createFromDateParam(date: string | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }

  let dateValue = Number.isNaN(+date) ? new Date(date) : new Date(+date);
  return isNaN(dateValue.getTime()) ? undefined : dateValue;
}
