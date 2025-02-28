 {/* Sidebar */}
      <div className={`
        fixed lg:static w-[280px] lg:w-64 h-full bg-gray-800 p-4 z-40
        transform lg:transform-none transition-transform duration-200
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isSidebarOpen ? 'top-16 lg:top-0' : 'top-0'}
      `}>
        <div className="hidden lg:flex items-center gap-3 mb-8 p-2">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
            <p className="text-sm text-gray-400">Manage your portfolio</p>
          </div>
        </div>

        <nav className="space-y-2">
        <button
            onClick={() => {
              setActiveTab("profile");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "experience"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Experience
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "education"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Education
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "skills"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Coffee className="w-5 h-5" />
            Skills
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "projects"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Folder className="w-5 h-5" />
            Projects
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 w-[calc(100%-2rem)] flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8 mt-16 lg:mt-0">
        {" "}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
            </h2>
            {activeTab !== "profile" && (
              <button
                onClick={() => openForm("add")}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            )}
          </div>

          {isLoadingProfile ||
          isLoadingExperiences ||
          isLoadingEducation ||
          isLoadingSkills ||
          isLoadingProjects ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === "profile" && profile && (
                <form id="profile-form" className="space-y-6">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      defaultValue={profile.full_name}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Title Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title (Separate multiple titles with /)
                    </label>
                    <textarea
                      rows={4}
                      name="title"
                      defaultValue={
                        profile.title ? profile.title.join(" / ") : ""
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* GitHub Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub
                    </label>
                    <input
                      type="text"
                      name="github"
                      defaultValue={profile.github}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* LinkedIn Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      defaultValue={profile.linkedin}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={profile.email}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Save Changes Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const form = document.getElementById(
                        "profile-form"
                      ) as HTMLFormElement;
                      if (form) {
                        const formData = new FormData(form);
                        const data: Record<string, any> = {};

                        formData.forEach((value, key) => {
                          if (key === "title") {
                            // Split the title field by "/" and trim whitespace
                            data[key] = (value as string)
                              .split("/")
                              .map((title) => title.trim());
                          } else {
                            data[key] = value;
                          }
                        });

                        console.log("Data being sent to Supabase:", data); // Debugging
                        updateProfile.mutate(data);
                      } else {
                        console.error("Form not found");
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md flex items-center justify-center transition-colors ml-auto"                  >
                    Save Changes
                  </button>
                </form>
              )}

              {activeTab !== "profile" && (
                <div className="grid gap-4">
                  {activeTab === "experience" &&
                    experiences?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">{item.tech}</p>
                          <p className="text-gray-400">
                            {item.company} • {item.duration}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "education" &&
                    education?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.degree}
                          </h3>
                          <p className="text-gray-400">
                            {item.university} • {item.cgpa}
                          </p>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "skills" &&
                    skills?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                      >
                        <div className="w-full sm:w-auto">
                          <h3 className="text-lg font-medium text-white">
                            {item.name}
                          </h3>
                          <div className="mt-2 space-y-2">
                            <p className="text-gray-400">
                              Level: {item.level}%
                            </p>
                            <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${item.level}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "projects" &&
                    projects?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.tech.map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-600 rounded text-sm text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 sm:ml-4">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>