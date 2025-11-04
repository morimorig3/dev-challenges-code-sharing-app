import logoImage from "@/assets/NoteCodeLogo.svg";

export const Header = () => {
  return (
    <header className="flex flex-col gap-y-4 items-center font-[Outfit] font-semibold">
      <p>
        <img src={logoImage} alt="Note Code" />
      </p>
      <h1 className="text-[40px] text-center">
        <span className="text-[32px]">Create & Share</span>
        <br />
        Your Code easily
      </h1>
    </header>
  );
};
