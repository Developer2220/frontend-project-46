import yaml from 'js-yaml';

const getParsedFileData = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown ext: '${ext}'!`);
  }
};

export default getParsedFileData;
