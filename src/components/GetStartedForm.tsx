import GetStartedWizard from "./GetStartedWizard";

const GetStartedForm = () => {
  return (
    <section id="get-started-form" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <GetStartedWizard />
      </div>
    </section>
  );
};

export default GetStartedForm;
