import { Auth, ThemeMinimal } from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Dialog, DialogContent, DialogProps } from '@mui/material';
import { FC } from 'react';

export const AuthPopup: FC<DialogProps> = (props) => {
  const supabase = useSupabaseClient();

  return (
    <Dialog {...props}>
      <DialogContent>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeMinimal }}
          theme='dark'
        />
      </DialogContent>
    </Dialog>
  );
};
