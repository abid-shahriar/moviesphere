import styled from 'styled-components';
import { useRouter } from 'next/router';

const DetailsPage = () => {
  const router = useRouter();
  console.log(router.query.id);

  return <></>;
};

export default DetailsPage;
