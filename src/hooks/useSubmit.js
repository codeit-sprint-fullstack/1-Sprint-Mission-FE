export default function useSubmit(...errorStates) {
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    const noErrors = errorStates.every((errorState) => errorState === false);
    setAllValid(noErrors);
  }, [errorStates]);

  return allValid;
}
