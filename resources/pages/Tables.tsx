import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';

const Tables = ({ name = 'Tables' }) => {
  return (
    <>
      <Breadcrumb pageName={name} />

      <div className="flex flex-col gap-10">
        <TableOne name="Electronics" />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </>
  );
};

export default Tables;
