import TableOne from '../components/Tables/TableOne';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';

const Tables = ({ name = 'Tables' }) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Products | CI4 React TailwindCss</title>
        </Helmet>
      </HelmetProvider>

      <div className="flex flex-col gap-10">
        <TableOne name="Electronics" />
      </div>
    </>
  );
};

export default Tables;
