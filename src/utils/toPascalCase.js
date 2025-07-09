export default function toPascalCase(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '') // Remove non-alphanumeric characters
      .split(/[\s_]+/) // Split by spaces or underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  