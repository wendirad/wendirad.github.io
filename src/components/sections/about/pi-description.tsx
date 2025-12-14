export default function Description({
  descriptions,
}: {
  descriptions: string[];
}) {
  return (
    <div className="space-y-6">
      {descriptions.map((description, index) => (
        <p
          key={index}
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left"
        >
          {description}
        </p>
      ))}
    </div>
  );
}
