import React, { useEffect } from 'react';
import Obfuscate from 'react-obfuscate';
//import { decrypt } from '../../utils/utils';
export interface IContactMeHrefProps {}

export const ContactMeHref: React.FC<IContactMeHrefProps> = () => {
  const [emailAddress, setEmailAddress] = React.useState('');
  useEffect(() => {
    //Temporary obfuscation solution, simply hiding email.
    setEmailAddress(atob('aW5mb0BteXRyYWluaW5ndHJhY2tlci5jb20='));
  }, []);

  return (
    <div>
      <Obfuscate email={emailAddress} style={{ display: 'inline-block' }} />
    </div>
  );
};

export default ContactMeHref;
