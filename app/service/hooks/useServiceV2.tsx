/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/dist/query';
// eslint-disable-next-line import/no-unresolved
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export default function useServiceV2<G, A, C extends BaseQueryFn, V extends string, L>(
  f: readonly [MutationTrigger<MutationDefinition<A, C, V, L>>, G],
  onSuccess: () => void,
  onError: () => void,
) {
  const [mutation, query] = f;

  const customMutation = async (args: A) => {
    //@ts-expect-error
    const result = await mutation(args);

    if ('error' in result) {
      onError?.();
      console.warn(result.error);
    } else {
      onSuccess?.();
    }
  };

  return [customMutation, query] as const;
}
