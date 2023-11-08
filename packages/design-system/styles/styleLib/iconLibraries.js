import * as Fa5Icons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as FiIcons from 'react-icons/fi';
import * as Io4Icons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';

const iconLibraries = (iconProp) => {
  let libraries = [];

  if (iconProp.startsWith('FA')) {
    libraries = [Fa5Icons, Fa6Icons];
  } else if (iconProp.startsWith('Fi')) {
    libraries = [FiIcons];
  } else if (iconProp.startsWith('Io')) {
    libraries = [Io4Icons, Io5Icons];
  } else if (iconProp.startsWith('Md')) {
    libraries = [MdIcons];
  } else {
    libraries = [Fa5Icons, Fa6Icons, FiIcons, Io4Icons, Io5Icons, MdIcons];
    console.warn(`Unknown icon prefix for ${iconProp}, searching all libraries.`);
  }

  for (const library of libraries) {
    const IconComponent = library[iconProp];
    if (IconComponent !== undefined) {
      return IconComponent;
    }
  }

  console.error(`Icon ${iconProp} not found in installed libraries.`);
  return null;
};

export default iconLibraries;
