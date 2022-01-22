interface configInterface {
  MDBBaseUrl: string;
  MDBApiKey: string;
}

const config: configInterface = {
  MDBApiKey: process.env.NEXT_PUBLIC_MDB_API || '',
  MDBBaseUrl: process.env.NEXT_PUBLIC_MDB_BASEURL || ''
};

export default config;
