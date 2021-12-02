export const lookUp = (
    from: string,
    localField: string,
    foreignField: string,
    as: string
) => ({$lookup: { from, localField, foreignField, as }})

export const unwind = (
    path: string,
    preserveNullAndEmptyArrays: boolean,
    includeArrayIndex?: boolean
    ) => ({$unwind: { path, preserveNullAndEmptyArrays }})

    export const lookUpUnwind = (
        from: string,
        localField: string,
        foreignField: string,
        as: string,
        preserveNullAndEmptyArrays: boolean
    ) => 
    [
        lookUp(
            from,
            localField,
            foreignField,
            as
        ),
        unwind(
            '$' + as,
            preserveNullAndEmptyArrays
        )
    ]