type TableProps = {
  className: string;
};

const Table: React.FC<TableProps> | React.ReactNode = (props) => {
  const isRemarkHighlight = props.className === 'remark-highlight';

  if (isRemarkHighlight) {
    return props.children;
  }

  return <table {...props} />;
};

export default Table;
