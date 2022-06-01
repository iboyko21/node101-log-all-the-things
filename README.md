# node101-log-all-the-things

## Exit Criteria

### Every request to your server must be logged to the console
### Every request to your server must be logged to a file
### The log file is named log.csv and must be csv format
### Must use fs.appendFile, do not use fs.appendFileSync
Expose an endpoint (does not require authentication) http://localhost:3000/logs that will return a json object with all the logs
All tests must pass