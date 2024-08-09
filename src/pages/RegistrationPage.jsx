import Wrapper from '../components/Wrapper/Wrapper';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import './Pages.css';

export default function RegistrationPage() {
  const INITIAL_VALUES = { name: '', description: '', price: '' };
  return (
    <main>
      <Wrapper className='Wrapper'>
        <RegistrationForm
          className='RegistrationForm'
          initialValue={INITIAL_VALUES}
        />
      </Wrapper>
    </main>
  );
}
