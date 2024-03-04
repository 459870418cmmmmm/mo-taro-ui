export default function classnames(...args: any) {
  return args.map(toClassName).filter(Boolean).join(' ');
}

function toClassName(value: any) {
  let result = '';

  if (typeof value === 'string' || typeof value === 'number') {
    result += value;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(' ');
    } else {
      for (const key in value) {
        if (value[key]) {
          result && (result += ' ');
          result += key;
        }
      }
    }
  }

  return result;
}
