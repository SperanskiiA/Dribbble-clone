import React from 'react'

type FormFieldProps = {
    title: string
    placeholder: string
    state: string
    setState: (val: string) => void
    isTextArea?: boolean
    type?: string
}
const FormField = ({
    title,
    state,
    setState,
    placeholder,
    type,
    isTextArea,
}: FormFieldProps) => {
    return (
        <div className="flexStart flex-col w-full gap-4">
            <label className="w-full text-gray-100">{title}</label>

            {isTextArea ? (
                <textarea
                    className="form_field-input"
                    placeholder={placeholder}
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    type={type || 'text'}
                    className="form_field-input"
                    placeholder={placeholder}
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    )
}

export default FormField
