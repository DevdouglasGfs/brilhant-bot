{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.nodemon
    pkgs.bun
  ];

  # Sets environment variables in the workspace
  env = { };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "ssmi.after-dark"
    ];

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        bun-install = "bun install";
      };
      # Runs when the workspace is (re)started
      onStart = { };
    };
  };
}
