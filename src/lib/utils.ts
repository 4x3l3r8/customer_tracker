import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The function `cn` in TypeScript merges multiple class values using `clsx` and `twMerge`.
 * @param {ClassValue[]} inputs - The `inputs` parameter in the `cn` function is a rest parameter that
 * allows you to pass in multiple arguments of type `ClassValue`. These arguments can be strings,
 * arrays, or objects representing CSS classes. The function then merges and processes these class
 * values using the `clsx` and `
 * @returns The `cn` function is returning the result of merging the class names passed as arguments
 * using the `clsx` function and then applying Tailwind CSS utility classes using the `twMerge`
 * function.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The function checks if a given object is empty by iterating through its properties.
 * @param obj - The `obj` parameter in the `isEmptyObject` function is the object that you want to
 * check for emptiness. The function will return `true` if the object has no own properties (i.e., it
 * is empty), and `false` if the object has at least one own property.
 * @returns The function `isEmptyObject` returns `true` if the object passed as an argument is empty
 * (i.e., it has no own properties), and `false` if the object has at least one own property.
 */
export const isEmptyObject = (obj: object) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false; // If the object has any own property, it's not empty
    }
  }
  return true; // If no own properties are found, the object is empty
};
