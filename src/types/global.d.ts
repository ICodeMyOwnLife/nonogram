interface Window {
  AccountKit_OnInteractive: VoidFunction;
  AccountKit: AccountKit.AccountKit;
}

namespace AccountKit {
  interface AccountKit {
    init: (config: AccountKitConfig) => void;
    login: (method: 'PHONE' | 'EMAIL', config: {}, callback) => void;
  }

  interface AccountKitConfig {
    appId: string;
    state: string;
    version: string;
    display?: 'popup' | 'modal';
    debug?: boolean;
    fbAppEventsEnabled?: boolean;
  }

  type LoginCallback = (response: LoginResponse) => void;

  interface LoginResponse {
    status: 'PARTIALLY_AUTHENTICATED' | 'NOT_AUTHENTICATED' | 'BAD_PARAMS';
    code: string;
    state: string;
  }
}

interface VoidFunction<TArgs extends any[] = []> {
  (...args: TArgs): void;
}

type TypedFunction<TArgs extends any[] = [], TReturn = void> = (
  ...args: TArgs
) => void;
