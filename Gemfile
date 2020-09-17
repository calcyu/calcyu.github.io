source 'https://rubygems.org'

# jekyll, which builds it all
# 3.0 includes sass processing
gem "jekyll", "~> 3.8.5"

# algolia
group :jekyll_plugins do
    gem 'jekyll-algolia', '~> 1.0'
    gem 'jekyll-sitemap', '~> 1.1', '>= 1.1.1'
    gem 'jekyll-paginate', '~> 1.1'
    gem 'jekyll-seo-tag', '~> 2.4'
    gem 'jekyll-feed', '~> 0.9.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby] if Gem.win_platform?
# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
