import React, { useEffect } from 'react';
import Obfuscate from 'react-obfuscate';
import { decrypt } from '../../utils/utils';
export interface IContactMeHrefProps {}

export const ContactMeHref: React.FC<IContactMeHrefProps> = () => {
  const [emailAddress, setEmailAddress] = React.useState('');
  useEffect(() => {
    //Temporary obfuscation solution. See function for credit.
    setEmailAddress(
      decrypt('ff9a8d9694d1929e8d8b96919a8c8c9e919c979a8cbf98929e9693d19c9092'),
    );
  }, []);

  return (
    <div>
      <Obfuscate email={emailAddress} style={{ display: 'inline-block' }} />
    </div>
  );
};

export default ContactMeHref;
