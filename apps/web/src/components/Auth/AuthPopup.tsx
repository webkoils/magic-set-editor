import { Auth } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Dialog, DialogContent, DialogProps } from '@mui/material';
import { FC } from 'react';

import { AuthTheme } from './AuthTheme';

export const AuthPopup: FC<DialogProps> = (props) => {
  const supabase = useSupabaseClient();

  return (
    <Dialog {...props}>
      <DialogContent>
        <Auth
          supabaseClient={supabase}
          appearance={{ variables: { default: AuthTheme } }}
          theme='default'
        />
      </DialogContent>
    </Dialog>
  );
};
