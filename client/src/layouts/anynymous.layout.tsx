/**
 * Definicie layoutu pro stránky, kde není třeba přihlášení.
 */
const AnonymousLayout = ({ children } : any) => (
    <main>
        {children}
    </main>                                       
);

export default AnonymousLayout;