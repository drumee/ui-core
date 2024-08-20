// @ts-nocheck

const a = {
}

/**
 * 
 */
function register(kind, ref){
  if (a[kind]) {
    console.warn(`Kind ${kind} already exists. Skipped`);
    return;
  }
  if (_.isFunction(ref.then)) {
    a[kind] = (s, f)=>{
      ref.then((m)=>{
        s(m.default)
      }).catch(f)  
    }
  }
}
/**
 * 
 * @param {*} name 
 * @returns 
 */
function get (name) {
  if(a[name]) return new Promise(a[name]);
  return null;
};
  
module.exports = {get, register};