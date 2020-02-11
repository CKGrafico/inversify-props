import { generateIdName } from './id.helper';
import { Constructor } from './inversify.types';

export function getParametersFromConstructor(constructor: Constructor): string[] {
  const stringParameters = getParametersAsStringFromConstructor(constructor);
  return convertStringParametersToList(stringParameters);
}

export function getParametersAsStringFromConstructor(constructor: Constructor): string {
  const parameters = constructor.toString().match(/(constructor|function) (.*) ?\((.*)\)/);

  if (!parameters) {
    throw new Error(`Cannot find constructor in this class ${constructor.name}`);
  }

  return parameters[3];
}

export function convertStringParametersToList(stringParameters: string): string[] {
  return stringParameters
    .split(',')
    .map(arg => arg.replace(/\/\*.*\*\//, '').trim())
    .filter(x => x);
}

export function cleanParameter(parameter: string): string {
  return generateIdName(parameter).replace(/_/g, '');
}
