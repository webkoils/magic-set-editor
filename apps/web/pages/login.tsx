import { Auth, ThemeMinimal } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Container } from '@mui/material';

const LoginPage = () => {
  const supabase = useSupabaseClient();

  return (
    <Container maxWidth='sm' style={{ padding: '50px 0 100px 0' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeMinimal }}
        theme='dark'
      />
    </Container>
  );
};

export default LoginPage;
