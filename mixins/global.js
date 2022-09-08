 const deepFind = (obj, path) => {
   if (obj) {
     var paths = path.split('.'),
       current = obj,
       i;

     for (i = 0; i < paths.length; ++i) {
       if (current[paths[i]] == undefined) {
         return undefined;
       } else {
         current = current[paths[i]];
       }
     }
     return current;
   } else {
     return undefined;
   }
 };
 export default {
   data() {
     return {
       api_url: process.env.strapiBaseUri,
       host: process.env.hostname
     }
   },
   methods: {
     deepFind
   },
 }
