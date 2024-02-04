// const createClassNamesFactory =
//   (classes: unknown) =>
//   (type: unknown, ...otherClasses: unknown[]) => {
//     const classList = [classes[type], ...otherClasses];
//     return classList.join(" ");
//   };




const createClassNamesFactory = <TVariant extends string>(classes: Record<TVariant, string>) => (variant: TVariant, ...otherClasses: Array<string>) => {
    const variantClassnames = classes[variant]
    
    return [...variantClassnames, ...otherClasses].join(" ")
}


const getBg = createClassNamesFactory({
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
});

// expect
const bgPrimary = getBg("secondary") 

const bgPrimaryWithOtherClasses = getBg("primary", "text-white", "rounded", "p-4")