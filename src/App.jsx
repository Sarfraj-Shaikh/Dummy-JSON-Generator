import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

const App = () => {
  const [dataType, setDataType] = useState("user");
  const [dataLength, setDataLength] = useState(1);
  const [output, setOutput] = useState([]);

  const dataTypes = [
    {
      id: "user",
      label: "Users",
      icon: "ri-user-3-line",
      description: "User profiles and personal details"
    },
    {
      id: "product",
      label: "Products",
      icon: "ri-box-3-line",
      description: "Product information and inventory"
    },
  ];

  const genUsers = () => {
    return ({
      id: nanoid(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: "international" }),
      gender: faker.person.gender(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      state: faker.location.state(),
      city: faker.location.city(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    })
  };

  const genProducts = () => {
    return ({
      id: nanoid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.product(),
      price: faker.commerce.price(),
      material: faker.commerce.productMaterial(),
      order_id: `ORD-${nanoid()}`,
    })
  }

  const handleGenData = () => {

    if (!dataLength || Number(dataLength) < 1 || Number(dataLength) > 100) {
      return toast.error("Invalid Number Of Records");
    }

    if (!dataType || dataType !== "user" && dataType !== "product") {
      return toast.error("Select Data Type First");
    }

    let tmpData = [];

    if (dataType === "user") {
      for (let i = 0; i < Number(dataLength); i++) {
        tmpData.push(genUsers());
      }
    }
    else if (dataType === "product") {
      for (let i = 0; i < Number(dataLength); i++) {
        tmpData.push(genProducts());
      }
    }

    setOutput(tmpData);
    tmpData = [];

  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(output, null, 2)
      );

      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy data");
      console.error("Copy failed:", error);
    }
  };

  return (

    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">

      <Toaster />

      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
              <i className="ri-database-2-line text-xl" />
            </div>

            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">DataForge</h1>
              <p className="text-[11px] font-medium tracking-wide text-slate-500">DATA GENERATOR</p>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700">
              Built By Sarfraj Shaikh
            </span>
          </div>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* HEADING SECTION */}
        <section className="animate-fade-up mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                Generate your <span className="text-indigo-600">data.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Create structured datasets with a clean, intuitive workspace built for your development workflow.
              </p>
            </div>
          </div>
        </section>

        <section className="grid animate-fade-up grid-cols-1 items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/50">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <i className="ri-equalizer-2-line text-xl" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">Configuration</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Customize your dataset</p>
                </div>

              </div>

            </div>

            <div className="space-y-7 p-5 sm:p-6">

              <div>

                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-800">Select data type</label>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Required</span>
                </div>

                {/* DATA TYPE LIST */}
                <div className="grid grid-cols-2 gap-3">

                  {dataTypes.map((type) => (

                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setDataType(type.id)}
                      className={`group relative flex cursor-pointer flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] 
                        ${dataType === type.id
                          ? "border-indigo-500 bg-indigo-50/70 shadow-sm shadow-indigo-100 ring-2 ring-indigo-500/10"
                          : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"}`
                      }>

                      <div
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 
                        ${dataType === type.id
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                            : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"}`
                        }>
                        <i className={`${type.icon} text-xl`} />
                      </div>

                      <span className={`text-sm font-bold ${dataType === type.id ? "text-indigo-700" : "text-slate-800"}`}>
                        {type.label}
                      </span>

                      <span className="mt-1 text-[11px] leading-4 text-slate-500">
                        {type.description}
                      </span>

                      <span
                        className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200 
                        ${dataType === type.id
                            ? "bg-indigo-600 text-white"
                            : "border border-slate-200 bg-white text-transparent"}`
                        }>
                        <i className="ri-check-line text-xs" />
                      </span>

                    </button>

                  ))}

                </div>

              </div>

              <div>

                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="data-length" className="text-sm font-semibold text-slate-800">Number of records</label>
                  <span className="text-xs font-medium text-slate-400">1–100</span>
                </div>

                <div
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 transition-all duration-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-slate-300"
                >
                  <i className="ri-hashtag text-lg text-slate-400 transition-colors group-focus-within:text-indigo-600" />
                  <input
                    id="data-length"
                    type="number"
                    min={1}
                    max={100}
                    value={dataLength}
                    onChange={(e) => setDataLength(e.target.value)}
                    placeholder="Enter quantity"
                    className="h-12 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                  />
                  <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-500">Records</span>
                </div>

              </div>

              <button
                type="button"
                onClick={handleGenData}
                className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 active:translate-y-0 active:scale-[0.98]"
              >
                <i className="ri-magic-line text-lg transition-transform duration-300 group-hover:rotate-12" />
                <span>Generate Data</span>
                <i className="ri-arrow-right-line ml-auto text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </div>

          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/50">

            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <i className="ri-file-list-3-line text-xl" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">Generated output</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Your dataset will appear here</p>
                </div>

              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">

                <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">{output.length} records</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={output.length === 0}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Copy output"
                >
                  <i className="ri-file-copy-line text-base" />
                </button>
              </div>
            </div>

            {/* OUTPUT */}
            {output.length === 0 ? (
              <div className="flex min-h-[390px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[480px]">

                <div className="relative mb-7 flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-indigo-200" />
                  <div className="absolute inset-3 rounded-full bg-indigo-50/80" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-indigo-600 shadow-lg shadow-indigo-100/70 transition-all duration-500 hover:rotate-6 hover:scale-110">
                    <i className="ri-database-2-line text-3xl" />
                  </div>
                  <span className="absolute right-2 top-3 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-400 shadow-sm">
                    <i className="ri-code-s-slash-line text-base" />
                  </span>
                  <span className="absolute bottom-2 left-1 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-400 shadow-sm">
                    <i className="ri-braces-line text-base" />
                  </span>
                </div>

                <span className="mb-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Empty state
                </span>

                <h4 className="text-lg font-bold tracking-tight text-slate-800">
                  Nothing to display yet
                </h4>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Your generated records will appear here. Configure your data type and quantity to get started.
                </p>

              </div>
            ) : (
              <div className="animate-fade-up overflow-y-auto p-5 sm:p-6 max-h-[420px]">
                <pre className="min-w-0 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">{JSON.stringify(output, null, 2)}</pre>
              </div>
            )}

          </div>
        </section>

        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} DataForge. Built By Sarfraj Shaikh for developers.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;