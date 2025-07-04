rm -rf node_modules/.vite

npm run dev -- --force

https://github.com/Apollo-Level2-Web-Dev/B5A4
https://docs.google.com/document/d/13WSmmTHvOLYWPVXJlmFGalnCXcF60D6omjk-a1xTW-c/edit?tab=t.0

Update more
ISBN should not same !
Some Question for support session

1.  { ... }[]
    [{ ... }] what is the different of them

2.  What is Partial<T>?

3.  What is Object.keys

4.  return data.data;
    Property 'data' does not exist on type 'Book'.ts(2339)
    any

5.  onChange={handleChange} fixed

6.  url: `/books/${book._id}`, why it works is it should without slash url: `books/${book._id}`,

7.  if (
    isBorrow &&
    data &&
    data.copies !== undefined &&
    typeof data.copies === "number" &&
    form["quantity"] !== undefined &&
    data.copies > Number(form["quantity"])
    ) {
    navigate("/borrowed-books");
    }

    customModal er 92 line
    if (
    isBorrow &&
    (data && "copies" in data && typeof (data as { copies: number }).copies === "number") &&
    (form["quantity" as keyof T] !== undefined) &&
    ((data as { copies: number }).copies > Number(form["quantity" as keyof T]))
    ) {
    navigate("/borrowed-books");
    }

8.  defaultForm[field.name as keyof T] = true as any;

    customModal er 45 line
    defaultForm[field.name as keyof T] = true as unknown as T[keyof T];

9.  Book.tsx er 125 number line

10. => Promise<void> | void
→ This means the function can either:

finish immediately and return void (no value)

or return a Promise<void> if it wants to do something asynchronous (like saving to a server)

onSubmit: (data: Partial<T>) => Promise<void> | void

👉 “onSubmit is a function taking partial data of type T, and can run either synchronously or asynchronously.”