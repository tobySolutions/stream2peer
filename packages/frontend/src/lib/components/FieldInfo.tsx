export default function FieldInfo({ field }) {
  return (
    <p className="text-sm text-pink-500 mb-2">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <>{field.state.meta.errors.join(",")}</>
      ) : null}

      {field.state.meta.isValidating ? "Validating..." : null}
    </p>
  );
}
