// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSubclass = (childClass: any, parentClass: any) => {
  let prototype = childClass.prototype ?? childClass.__proto__;
  while (prototype !== null) {
    if (prototype === parentClass.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}