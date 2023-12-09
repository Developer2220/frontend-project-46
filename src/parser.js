import yaml from 'js-yaml';

const getParsedFileData = (data, ext) => {
  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(data);
  }
  return 'Unknown ext!';
};

export default getParsedFileData;
