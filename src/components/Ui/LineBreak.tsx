const LineBreak = ({ text }: { text: string }) => {
  const linebreak = text.split('\n').map((line: string) => {
    return (
      <>
        {line}
        <br />
      </>
    );
  });

  return <>{linebreak}</>;
};

export default LineBreak;
