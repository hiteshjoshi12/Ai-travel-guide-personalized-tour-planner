const ChainOfThoughtInline = ({ steps }) => {
  const extractHeading = (text) => {
    if (!text) return '';
    const headingMatch = text.match(/^(?:\*\*)?([^:\*\n]+)(?:\*\*)?:/);
    if (headingMatch) return headingMatch[1].trim();
    const firstLine = text.split(/[.\n]/)[0].trim();
    return firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
  };

  const current = steps.length ? steps[steps.length - 1] : null;
  const heading = current ? extractHeading(current) : 'Waiting...';

  return (
    <div className="w-full flex items-center justify-between mt-2 mb-2">
      <div className="text-sm font-medium text-gray-200">AI thought process:</div>
      <div className="flex-1 mx-3">
        <div className="w-full truncate text-sm font-medium text-indigo-200">{heading}</div>
      </div>
    </div>
  );
};

export default ChainOfThoughtInline;