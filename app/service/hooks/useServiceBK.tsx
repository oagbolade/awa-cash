// export default function useServiceV2<T extends [], Q, B, G>(
//   f: readonly [B, G],
//   onSuccess: () => void,
//   onError: () => void,
// ) {
//   const [mutation, query] = f;

//   const customMutation = async (...args: Parameters<B>) => {
//     const result = await mutation(...args);

//     if ('error' in result) {
//       onError?.();
//       console.warn(result.error);
//     } else {
//       onSuccess?.();
//     }
//   };

//   return [customMutation, query] as const;
// }

// // export const Apple = (): JSX.Element => {
// //   const check = useServiceV2(useLoginMutation());

// //   return <View />;
// // };

export const dnd = '';
