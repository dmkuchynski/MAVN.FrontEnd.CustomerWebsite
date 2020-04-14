export function toParamsString(model: any): string {
  const params: {key: string; value: string}[] = [];

  for (const key in model) {
    if (model.hasOwnProperty(key)) {
      const prop = (model as any)[key];
      // formData.append(key, prop);
      params.push({key, value: prop.toString()});
    }
  }

  const paramsStr = '?' + params.map(param => `${param.key}=${param.value}`).join('&');

  return paramsStr;
}
