const axios = require('axios');
// Disclaimer: this is working only if both apps have been strictly duplicated
// because we will rely on the fact to have the same stories id

// This token should have privileges on the targeted app or having a role 'ADMIN'
const token = 'TOKEN';

const api_embed_enpoint = 'https://api-XXXX.toucantoco.com/embed'

// Src
const src_dashboard_alias = 'XXX';

// Dest
const dest_small_app_name = 'YYY';
const dest_dashboard_alias = 'ZZZ'

async function main() {
  // Get the dashboard we want to duplicate
  const new_dash = await axios
    .get(`${api_embed_enpoint}/${src_dashboard_alias}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
      let new_dash = { ...res.data };
      // delete the uid, it's generated on the backend-side
      delete new_dash.uid;
      // update the small app name
      new_dash.smallApp = dest_small_app_name;
      // upddate the alias
      new_dash.alias = dest_dashboard_alias;

      return new_dash;
    })
    .catch(error => {
      console.error(error);
    });

    // Create the new dashboard
    axios
    .post(`${api_embed_enpoint}`, {
      ...new_dash
    }, {
          headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
      console.log(res.status);
      console.log(res.data);
    })
    .catch(error => {
      console.error(error);
    });
}

main();
