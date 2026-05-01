/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/../ts`; params?: Router.UnknownInputParams; } | { pathname: `/../components/Modal/Alerta`; params?: Router.UnknownInputParams; } | { pathname: `/../components/Modal/Modal`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/../ts`; params?: Router.UnknownOutputParams; } | { pathname: `/../components/Modal/Alerta`; params?: Router.UnknownOutputParams; } | { pathname: `/../components/Modal/Modal`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/../ts${`?${string}` | `#${string}` | ''}` | `/../components/Modal/Alerta${`?${string}` | `#${string}` | ''}` | `/../components/Modal/Modal${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/../ts`; params?: Router.UnknownInputParams; } | { pathname: `/../components/Modal/Alerta`; params?: Router.UnknownInputParams; } | { pathname: `/../components/Modal/Modal`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
